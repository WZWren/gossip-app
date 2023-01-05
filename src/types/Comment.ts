import React from "react";

type Comment = {
    cmmt_id:    number;
    user_id:    number;
    thread_id:  number;
    cmmt_date:  Date;
    cmmt_upd:   Date;
    cmmt_seq:   number;
    cmmt_body:  string;
}

export default Comment;