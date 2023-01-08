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

export default Thread;