import React from "react";

type Thread = {
    thread_id:      number;
    user_id:        number;
    tag_id:         number;
    thread_title:   string;
    thread_date:    string;
    thread_upd:     string;
    thread_cmmt_no: number;
    thread_body:    string;
}

export const null_thread: Thread = {
    thread_id:      0,
    user_id:        0,
    tag_id:         0,
    thread_title:   "Oops! You aren't supposed to see this.",
    thread_date:    "2000-01-01T00:00:00",
    thread_upd:     "2000-01-01T00:00:00",
    thread_cmmt_no: 0,
    thread_body:    "We are working hard to fix this!",
}
export function is_empty_thread(thread: Thread): boolean {
    return (thread == null_thread);
}
export default Thread;