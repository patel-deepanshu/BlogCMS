import { atom, selector } from "recoil";

interface BlogContent {
  title: string;
  body: string;
}

interface Blog {
  blogName: string;
  blogImage: string;
  createdAt: Date;
  content: BlogContent[];
}

interface User {
  user: { username: string; myBlogs: Blog[] } | null;
  isUser: boolean;
}

const userAtom = atom<User>({
  key: "userState",
  default: {
    user: null,
    isUser: false,
  },
});

export const isAdmin = selector<boolean>({
  key: "isAdmin",
  get: ({ get }) => {
    const user = get(userAtom);
    return user.isUser;
  },
});

export default userAtom;
