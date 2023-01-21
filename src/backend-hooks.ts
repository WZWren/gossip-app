// a simple .ts file to record all the links to the relevant backend.
// seperated so a change in url is easier to handle.
export const RegisterBackend: RequestInfo =
    "http://localhost:8000/api/register";
export const LoginBackend: RequestInfo =
    "http://localhost:8000/api/login";
export const LogoutBackend: RequestInfo =
    "http://localhost:8000/api/logout";
export const AuthBackend: RequestInfo =
    "http://localhost:8000/api/user";
export const GetUserNameBackend: RequestInfo =
    "http://localhost:8000/api/user/name";

export const GetThreadBackend: RequestInfo =
    "http://localhost:8000/api/thread/get";
export const PostThreadBackend: RequestInfo =
    "http://localhost:8000/api/thread/post";
export const SearchThreadBackend: RequestInfo =
    "http://localhost:8000/api/thread/search";

export const GetCommentBackend: RequestInfo = 
    "http://localhost:8000/api/comment/get";
export const PostCommentBackend: RequestInfo =
    "http://localhost:8000/api/comment/post";
export const DelCommentBackend: RequestInfo =
    "http://localhost:8000/api/comment/delete";
export const UpdCommentBackend: RequestInfo =
    "http://localhost:8000/api/comment/update";

export const GetTabsBackend: RequestInfo =
    "http://localhost:8000/api/tabs/get";
export const PostTabsBackend: RequestInfo =
    "http://localhost:8000/api/tabs/post";
export const DeleteTabsBackend: RequestInfo =
    "http://localhost:8000/api/tabs/delete";