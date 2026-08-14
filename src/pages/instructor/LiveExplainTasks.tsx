import { useNavigate } from "react-router-dom";
import "./LiveExplainTasks.css";

type LiveTask = {
    id: number;
    studentName: string;
    postedTime: string;
    subject: string;
    description: string;
    deadline: string;
    fileName: string;
};

const liveTasks: LiveTask[] = [
    {
        id: 1,
        studentName: "A.Amr",
        postedTime: "Posted 2 hours ago",
        subject: "Data Structures",
        description:
            "Need help understanding linked lists and basic implementation. Specifically focusing on doubly linked lists and memory management in C++.",
        deadline: "25 March 2026",
        fileName: "trial_task_data_structures.pdf",
    },
    {
        id: 2,
        studentName: "S.Ahmed",
        postedTime: "Posted 4 hours ago",
        subject: "Software Architecture",
        description:
            "Reviewing microservices architecture patterns and event-driven systems. Need a deep dive into Kafka versus RabbitMQ implementations.",
        deadline: "28 March 2026",
        fileName: "architecture_review_draft.pdf",
    },
    {
        id: 3,
        studentName: "O.Mohamed",
        postedTime: "Posted 6 hours ago",
        subject: "Linear Algebra",
        description:
            "Working through vector spaces and transformation matrices. Submission includes solved problems and a few remaining questions.",
        deadline: "02 April 2026",
        fileName: "math_problem_set_01.pdf",
    },
];

const LiveExplainTasks = () => {
    const navigate = useNavigate();

    return (
        <div className="live-explain-page">
            <div className="live-explain-container">

                <button
                    className="live-back-btn"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <div className="live-explain-header">
                    <span className="live-edtech-badge">
                        THE FUTURE OF EDTECH
                    </span>

                    <h1>Explain Tasks</h1>

                    <p>
                        Review requests and submit your time-based offer.
                    </p>
                </div>

                <div className="live-explain-tabs">

                    <button
                        className="live-explain-tab"
                        onClick={() => navigate(-1)}
                    >
                        Explanation by video
                    </button>

                    <button className="live-explain-tab active">
                        <span className="live-tab-check">✓</span>
                        Explanation by live
                    </button>

                </div>

                <div className="live-explain-content">

                    <div className="live-task-list">

                        {liveTasks.map((task) => (
                            <div
                                className="live-task-card"
                                key={task.id}
                            >

                                <div className="live-task-top">

                                    <span className="live-trial-badge">
                                        TRIAL REQUEST
                                    </span>

                                    <div className="live-task-deadline">
                                        <span>DEADLINE</span>
                                        <strong>{task.deadline}</strong>
                                    </div>

                                </div>

                                <h2>{task.studentName}</h2>

                                <span className="live-task-posted">
                                    {task.postedTime}
                                </span>

                                <h3>{task.subject}</h3>

                                <p className="live-task-description">
                                    {task.description}
                                </p>

                                <div className="live-task-bottom">

                                    <div className="live-pdf-chip">

                                        <span className="live-pdf-icon">
                                            ▣
                                        </span>

                                        <span>
                                            {task.fileName}
                                        </span>

                                    </div>

                                    <button
                                        className="live-view-btn"
                                        onClick={() =>
                                            navigate(
                                                `/instructor/trial-submission/${task.id}`,
                                                {
                                                    state: {
                                                        fromLive: true,
                                                        task: {
                                                            id: String(task.id),
                                                            studentName: task.studentName,
                                                            subject: task.subject,
                                                            deadline: task.deadline,
                                                            description: task.description,
                                                            filename: task.fileName,
                                                        },
                                                    },
                                                }
                                            )
                                        }
                                    >
                                        View Submission
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>

                    <aside className="live-priority-card">

                        <h3>Priority Support</h3>

                        <p>
                            Facing issues with a student submission?
                            Our academic coordinators are here to help 24/7.
                        </p>

                        <button>
                            Contact Support →
                        </button>

                    </aside>

                </div>

            </div>
        </div>
    );
};

export default LiveExplainTasks;