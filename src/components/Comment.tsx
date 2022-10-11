import { ThumbsUp, Trash } from "phosphor-react";
import { useState } from "react";
import { Avatar } from "./Avatar";
import styles from "./Comment.module.css";

interface CommentProps {
  content: string;
  deleteComment: (comment: string) => void;
}

export function Comment({ content, deleteComment }: CommentProps) {
  const [count, setcount] = useState(0);

  return (
    <div className={styles.comment}>
      <Avatar
        hasBorder={false}
        src="https://avatars.githubusercontent.com/u/30875229?v=4"
        alt=""
      />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Paulo Santana</strong>
              <time title="11 de Maio as 10:00h">Cerca de 1h atrás</time>
            </div>
            <button
              onClick={() => {
                deleteComment(content);
              }}
              title="Deletar comentário"
            >
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>
        <footer>
          <button onClick={() => setcount(count + 1)}>
            <ThumbsUp />
            Aplaudir <span>{count}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}
