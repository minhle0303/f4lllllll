import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Spin, message, Button } from "antd";
import moment from "moment";
import { getQuestionById, incrementViewCount, voteQuestion } from "../../../services/forumService";
import { DataContext } from "../../helpers/DataContext";
import CreateComment from "./CreateComment";

const { Title, Paragraph, Text } = Typography;

const DetailPage = () => {
    const { id } = useParams();
    const { user } = useContext(DataContext); // Lấy thông tin user từ context
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(false);

    // Trạng thái lưu lượt vote của từng user
    const [userVoteState, setUserVoteState] = useState({
        hasLiked: false,
        hasDisliked: false,
    });

    const fetchQuestionDetails = async () => {
        try {
            setLoading(true);
            const response = await getQuestionById(id); // Gọi API theo ID

            if (response && response.data.data) {

                // Gọi API tăng view count
                if (user && user.id) {
                    // console.log("User ID:", user.id);
                    // console.log("question ID:", id);
                    // console.log("Calling incrementViewCount API...");
                    await incrementViewCount(id, user.id);
                } else {
                    console.log("User not found or not logged in!");
                }


                setQuestion(response.data.data); // Đặt dữ liệu câu hỏi từ API

                // Lấy thông tin trạng thái vote hiện tại của user (nếu có)
                const userVote = response.data.data.votes.find(v => v.userId === user.id);
                if (userVote) {
                    setUserVoteState({
                        hasLiked: userVote.voteType === "UPVOTE",
                        hasDisliked: userVote.voteType === "DOWNVOTE",
                    });
                }

            } else {
                message.error("Không tìm thấy bài viết!");
            }
        } catch (error) {
            message.error("Có lỗi xảy ra khi lấy thông tin bài viết!");
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (voteType) => {
        if (!user || !user.id) {
            message.error("Bạn cần đăng nhập để thực hiện chức năng này!");
            return;
        }

        try {
            let updatedQuestion = { ...question };

            // Kiểm tra trạng thái hiện tại và xử lý hủy hoặc chuyển đổi vote
            if (voteType === "UPVOTE") {
                if (userVoteState.hasLiked) {
                    // Hủy like
                    updatedQuestion.upvote -= 1;
                    setUserVoteState({ hasLiked: false, hasDisliked: false });
                } else {
                    // Chuyển từ dislike sang like hoặc thêm like
                    if (userVoteState.hasDisliked) {
                        updatedQuestion.downVote -= 1; // Hủy dislike
                    }
                    updatedQuestion.upvote += 1;
                    setUserVoteState({ hasLiked: true, hasDisliked: false });
                }
            } else if (voteType === "DOWNVOTE") {
                if (userVoteState.hasDisliked) {
                    // Hủy dislike
                    updatedQuestion.downVote -= 1;
                    setUserVoteState({ hasLiked: false, hasDisliked: false });
                } else {
                    // Chuyển từ like sang dislike hoặc thêm dislike
                    if (userVoteState.hasLiked) {
                        updatedQuestion.upvote -= 1; // Hủy like
                    }
                    updatedQuestion.downVote += 1;
                    setUserVoteState({ hasLiked: false, hasDisliked: true });
                }
            }

            // Gửi yêu cầu vote đến API
            const response = await voteQuestion(id, voteType, user.id);

            if (response && response.status === 200) {
                setQuestion(updatedQuestion);
                message.success("Cập nhật thành công!");
            } else {
                message.error("Có lỗi xảy ra khi thực hiện vote!");
            }
        } catch (error) {
            message.error("Có lỗi xảy ra khi thực hiện vote!");
        }
    };

    useEffect(() => {
        fetchQuestionDetails();
    }, [id]);

    if (loading || !question) {
        return (
            <div className="spinner-container">
                <Spin tip="Đang tải thông tin bài viết..." size="large">
                    <div style={{ padding: "50px" }} />
                </Spin>
            </div>
        );
    }

    return (
        <section id="services">
            <div style={{ padding: "20px", maxWidth: "800px", margin: "auto", marginTop: "90px" }}>
                <Title level={2}>{question.title}</Title>
                <Text type="secondary">
                    Tác giả: {question.author} -{" "}
                    {moment(question.createdAt, "YYYY-MM-DD HH:mm:ss").format("LLL")}
                </Text>
                <div style={{ margin: "20px 0" }}>
                    {question.questionImage && question.questionImage.length > 0 && (
                        <img
                            src={question.questionImage[0].imageUrl}
                            alt={question.title}
                            style={{ width: "100%", borderRadius: "8px" }}
                        />
                    )}
                </div>
                <Paragraph style={{ lineHeight: "1.8" }}>{question.content}</Paragraph>
                {/* Hiển thị upvote, downVote, viewCount */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                    <div>
                        <Button
                            onClick={() => handleVote("UPVOTE")}
                            type={userVoteState.hasLiked ? "primary" : "default"} // Đổi màu nếu đã Like
                        >
                            👍 Like ({question.upvote})
                        </Button>
                        <Button
                            onClick={() => handleVote("DOWNVOTE")}
                            danger={userVoteState.hasDisliked} // Đổi màu nếu đã Dislike
                            style={{ marginLeft: "10px" }}
                        >
                            👎 Dislike ({question.downVote})
                        </Button>
                    </div>
                    <Text type="secondary">👁️ Lượt xem: {question.viewCount}</Text>
                </div>
                {/* Tích hợp CreateComment bên dưới */}
                <div style={{ marginTop: "40px" }}>
                    <CreateComment questionId={id} />
                </div>
            </div>
        </section>
    );
};

export default DetailPage;
