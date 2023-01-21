type Thread = {
    thread_id:      number;
    user_id:        number;
    user_name:      string;
    tag_id:         number;
    thread_title:   string;
    thread_date:    number;
    thread_upd:     number;
    thread_cmmt_no: number;
    thread_body:    string;
}

export const null_thread: Thread = {
    thread_id:      0,
    user_id:        0,
    user_name:      "",
    tag_id:         0,
    thread_title:   "",
    thread_date:    946728000,
    thread_upd:     946728000,
    thread_cmmt_no: 0,
    thread_body:    "",
}

// since we supply a null thread, we need a way to validate the null thread.
export function is_empty_thread(thread: Thread): boolean {
    return (thread == null_thread);
}
export default Thread;