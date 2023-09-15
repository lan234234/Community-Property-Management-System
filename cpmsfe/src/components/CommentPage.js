import {
  Avatar,
  Comment,
  List,
  message,
  Button,
  Form,
  Input,
  Space,
} from "antd";
import React from "react";
import { useState, useEffect } from "react";
import { showReplyChat, chat, createChat, replyChat } from "../utils";
import moment from "moment";
import { LikeOutlined, LikeFilled, pushpin_filled } from "@ant-design/icons";

// the compoennt to add a comment
const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={1} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

function CommentPage() {
  const [dataL1, setDataL1] = useState([]);
  const [dataL2, setDataL2] = useState({});
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [expandStates, setExpandStates] = useState({});
  const [replyingStates, setReplyingStates] = useState({});
  const [thumbsupStates, setThumbsupStates] = useState({});

  const [newCommentValue, setNewCommentValue] = useState("");

  // handlers for submitting a 1st level comment
  const handleChange = (e) => {
    setNewCommentValue(e.target.value);
  };

  const handleSubmit = async () => {
    if (newCommentValue.length === 0) return;
    try {
      const postData = {
        content: newCommentValue,
        posted_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        reply_to: null,
      };
      await createChat(postData);
      message.success(`Post successfully`);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading1(true);
      setNewCommentValue("");
    }
  };

  const handleSubmitReply = async (id) => {
    if (newCommentValue.length === 0) return;
    try {
      const postData = {
        content: newCommentValue,
        posted_time: moment().format("YYYY-MM-DD HH:mm:ss"),
        reply_to: id,
      };
      const replyList = await replyChat(id, postData);
      setDataL2({ ...dataL2, [id]: replyList });
      message.success(`Post successfully`);
    } catch (error) {
      message.error(error.message);
    } finally {
      //   setLoading2(true);
      setReplyingStates({ ...replyingStates, [id]: false });
      setNewCommentValue("");
    }
  };

  const updateDataL1 = () => {};

  useEffect(() => {
    chat()
      .then((data) => {
        setDataL1(data);
      })
      .catch((err) => {
        message.error(err.message);
      });

    setLoading1(false);
  }, [loading1]);

  useEffect(() => {
    setLoading2(false);
  }, [expandStates, replyingStates]);

  const toggleReplies = async (id, isExpanded) => {
    if (!isExpanded) {
      try {
        const replies = await showReplyChat(id);
        setDataL2({ ...dataL2, [id]: replies });
        setExpandStates({ ...expandStates, [id]: true });
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading2(true);
      }
    } else {
      setExpandStates({ ...expandStates, [id]: false });
    }
  };

  const toggleAddReply = (id, isReplying) => {
    if (!isReplying) {
      setReplyingStates({ ...replyingStates, [id]: true });
    } else {
      setReplyingStates({ ...replyingStates, [id]: false });
    }
  };

  //   return (
  //     <List
  //       dataSource={dataL1}
  //       renderItem={(commentL1) => (
  //         <List.Item>
  //           {" "}
  //           <Comment author={commentL1.id}></Comment>{" "}
  //         </List.Item>
  //       )}
  //     ></List>
  //   );

  return (
    <>
      <Comment
        author={localStorage.getItem("username")}
        avatar={
          <Avatar
            src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1694752925~exp=1694753525~hmac=9f7cafd64ea5660940fd27018077159cd1115668df4f6ac95e5127faec762e83"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={loading1}
            value={newCommentValue}
          />
        }
      />
      <List
        //   itemLayout="vertical"
        loading={loading1}
        dataSource={dataL1}
        renderItem={(commentL1) => (
          <Comment
            author={commentL1.user.username}
            avatar={
              <Avatar
                src="https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1694752925~exp=1694753525~hmac=9f7cafd64ea5660940fd27018077159cd1115668df4f6ac95e5127faec762e83"
                alt="Han Solo"
              />
            }
            datetime={moment(commentL1.posted_time).fromNow()}
            content={commentL1.content}
            actions={[
              <span style={{ display: "table-cell", vertical_align: "middle" }}>
                <div style={{ display: "grid" }}>
                  <div style={{ grid_row: 1 }}>
                    <Space size={15}>
                      <Button>123</Button>
                    </Space>
                  </div>
                  <div style={{ grid_row: 2 }}>
                    <Button
                      type="link"
                      onClick={() =>
                        toggleReplies(
                          commentL1.id,
                          expandStates[`${commentL1.id}`]
                        )
                      }
                    >
                      {expandStates[`${commentL1.id}`]
                        ? "Hide replies"
                        : "Show replies"}
                    </Button>
                    <span
                      onClick={() =>
                        toggleAddReply(
                          commentL1.id,
                          replyingStates[`${commentL1.id}`]
                        )
                      }
                    >
                      {replyingStates[`${commentL1.id}`] ? "Unreply" : "Reply"}
                    </span>
                  </div>
                </div>
                {typeof replyingStates[`${commentL1.id}`] !== "undefined" &&
                  replyingStates[`${commentL1.id}`] !== false && (
                    <Comment
                      author={localStorage.getItem("username")}
                      avatar={
                        <Avatar
                          src="https://joeschmoe.io/api/v1/random"
                          alt="Han Solo"
                        />
                      }
                      content={
                        <Editor
                          onChange={handleChange}
                          onSubmit={() => handleSubmitReply(commentL1.id)}
                          submitting={loading2}
                          value={newCommentValue}
                        />
                      }
                    />
                  )}
                {typeof expandStates[`${commentL1.id}`] !== "undefined" &&
                  expandStates[`${commentL1.id}`] !== false && (
                    <div>
                      <List
                        loading={loading2}
                        dataSource={dataL2[`${commentL1.id}`]}
                        renderItem={(commentL2) =>
                          typeof commentL2 !== "undefined" && (
                            <div>
                              <Comment
                                author={commentL2.user.username}
                                avatar={
                                  <Avatar
                                    src="https://joeschmoe.io/api/v1/random"
                                    alt="Han Solo"
                                  />
                                }
                                datetime={moment(
                                  commentL2.posted_time
                                ).fromNow()}
                                content={commentL2.content}
                              ></Comment>
                            </div>
                          )
                        }
                      />
                    </div>
                  )}
              </span>,
            ]}
          ></Comment>
        )}
      />
    </>
  );
}

// {
//   typeof expandStates[`${commentL1.id}`] != "undefined" &&
//     expandStates[`${commentL1.id}`] !== false && (
//       <List
//         loading={loading2}
//         dataSource={dataL2[`${commentL1.id}`]}
//         renderItem={(commentL2) => (
//           <List.Item>
//             {" "}
//             <Comment>
//               {/* author={commentL2.user.username} */}
//               avatar=
//               {
//                 <Avatar
//                   src="https://joeschmoe.io/api/v1/random"
//                   alt="Han Solo"
//                 />
//               }
//               content={commentL2.content}
//               {/* actions=
//                 {[<span key="comment-nested-reply-to">Reply to</span>]} */}
//             </Comment>{" "}
//           </List.Item>
//         )}
//       />
//     );
// }

// {
//   /* actions=
//                   {[<span key="comment-nested-reply-to">Reply to</span>]} */
// }
export default CommentPage;
