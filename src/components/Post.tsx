import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

interface PostProps {
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };

  publishedAt: Date;
  content: {
    type: string;
    content: string;
  }[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setnewComment] = useState("");

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const publishedDateRelativetoNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleTextChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setnewComment(event.target.value);
  }

  function handleNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newComment]);

    setnewComment("");
  }

  function deleteComment(commentDeleted: string) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentDeleted;
    });

    setComments(commentsWithoutDeletedOne);
  }

  return (
    <div className={styles.post}>
      <header className={styles.header}>
        <div className={styles.profile}>
          <Avatar src={author.avatarUrl} />

          <div>
            <strong>{author.name}</strong>
            <p>{author.role}</p>
          </div>
        </div>
        <div>
          <time
            title={publishedDateFormatted}
            dateTime={publishedAt.toISOString()}
          >
            {publishedDateRelativetoNow}
          </time>
        </div>
      </header>
      <main className={styles.main}>
        {content.map((line) => {
          if (line.type == "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type == "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </main>
      <footer className={styles.footer}>
        <form onSubmit={handleNewComment} action="">
          <strong>Deixe seu feedback</strong>
          <textarea
            value={newComment}
            onChange={handleTextChange}
            name="comment"
            placeholder="Deixe aqui seu comentário..."
            required
          ></textarea>
          <div className={styles.button}>
            <button type="submit" disabled={newComment.length == 0}>
              Publicar
            </button>
          </div>
        </form>
      </footer>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment}
              content={comment}
              deleteComment={deleteComment}
            />
          );
        })}
      </div>
    </div>
  );
}
