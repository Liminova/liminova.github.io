---
title: "idekCTF 2024: web/crator"
date: 2024-08-19
author: Rylie
categories: ["ctf"]
tags: ["web", "idekctf"]
---

- i did all of this while having salc1 in the background.
- dockerfile
    - python 3.11
    - user `judge` gets added to group `sudo`
    - `app` is copied to `judge`'s home directory
    - workdir is set to `/home/judge/app`
    - the database is tagged `rw-------` (i don't rmb how many `-` there are)
    - `gunicorn` is started
- source code dissectation
    - `app.py`
        - flask instance
        - `/`: renders `index.html` with the list of all problems inside the db.
        - `/register`:
            - `GET` -> renders `register.html`
            - `POST` with username + password as form data:
                - if user already exists -> username taken
                - else -> add user with *plaintext* password to database
                - redirects to `/login`
        - `/login`:
            - `GET` -> renders `login.html`
            - `POST` with username + password as form data:
                - if user with username / password doesn't exist -> invalid username or password
                - else -> set `user_id` and `username` cookies (?) and redirect to `?next` or `/` by default
        - `/logout`:
            - removes `user_id` and `username` cookies
            - redirect to `/`
        - `/problem/:problem_id`:
            - select problem with `problem_id` from database
            - not found -> return `404`
            - else -> render `problem.html` with problem
        - `/submit/:problem_id`:
            1. select problem with `problem_id` from database
                - not found -> return `404` (no vuln here it looks like)
            2. `GET` -> renders `submit.html` with problem
            3. process submission:
                1. fetching stuff:
                - get test cases for problem from db
                - code is sent as form data
                - if code length > 32768 -> return `400`
                - open `sandbox.py` and read the file (seemingly unused?)
                2. creating submission:
                    - create submission object
                    - add submission to database
                3. prepare code:
                    - copy `sandbox.py` to `/tmp/sandbox.py`
                    - open `/tmp/{submission_id}.py`:
                        - import sandbox for submission_id
                        - replace all instances of `\r\n` with `\n`
                4. run testcases:
                    1. prepare test case status:
                        - create submission output object
                        - add submission output to db
                        - if `skip_remaining_cases`: set submission output's status to `Skipped`
                        - if test case is not hidden: set submission output's expected output to testcase's output
                    2. setup input / output:
                        - open `/tmp/{submission_id}.in`: write testcase input, normalizing newlines to `\n`.
                        - same thing for output
                    3. run code:
                        - `sudo -u nobody -g nogroup python3 /tmp/{submission_id}.py < /tmp/{submission_id}.in > /tmp/{submission_id}.out`
                            - if return code is not 0:
                                - return `Runtime Error`
                                - skip all remaining cases
                            - else:
                                - `diff /tmp/{submission_id}.out /tmp/{submission_id}.expected`
                                - if any diff:
                                    - return `Wrong Answer`
                                    - skip all remaining cases
                        - if `TimeoutExpired`:
                            - return `Time Limit Exceeded`
                            - skip all remaining cases
                    4. cleanup:
                        - read 1024 bytes from `/tmp/{submission_id}.out` and save to submission case's actual output
                        - cleanup test case: remove input / output / expected files
                5. overall status:
                    - if submission status is `Pending`: set to `Accepted`
                    - remove submission code file
                    - redirect to `/submission/{submission_id}`
        - `/submission/:submission_id`:
            - find matching submission for user
            - not found -> return `404`
            - not correct user -> return `403`
            - get test cases -> render `submission.html` with submission and testcases
        - `/submissions`:
            - get all submissions for user (?)
            - render `submissions.html` with submission list
        - `418`: `I'm a {os.environ.get("F1ag")}` lol really
        - `500`: crashes the entire thing
            - so no hacking outside, everything's done from the web
    - `db.py`
        - all the models, nothing interesting
        - `os.environ.get("FLAG")` - notice the spelling
        - this is saved to `flag`
        - a test case with id `hello_input` and `hidden = True` is retrieved from database
        - its output is replaced with `flag`
    - `templates/`:
        - your usual flask templates, nothing interesting so far
    - `db.sqlite`:
        - usual sqlite stuff
        - `problem_test_cases`:
            - id `helloinput` has two cases, with the hidden one having the flag returned if you input the flag
- solving:
    - testing an instance:
        - doesn't seem like it's possible to read the input/output files
            - not enough perms? getting Runtime Error
            - yeah the files are created under user `judge`
