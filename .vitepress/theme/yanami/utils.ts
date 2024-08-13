import { Post } from "../../posts.data";

export function useYearSort(posts: Post[]): any[] {
    const data: any = [];
    let year = "0";
    let num = -1;

    for (let index = 0; index < posts.length; index++) {
        const element = posts[index];
        if (element.date.original) {
            const y = element.date.original.split("-")[0];
            if (y === year) {
                data[num].push(element);
            } else {
                num++;
                data[num] = [] as any;
                data[num].push(element);
                year = y;
            }
        }
    }

    return data;
}

export function formatDate(raw: string): Post["date"] {
    const date = new Date(raw);
    date.setUTCHours(12);
    return {
        original: raw,
        time: +date,
        string: date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
    }
}
