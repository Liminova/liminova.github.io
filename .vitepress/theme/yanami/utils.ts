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
