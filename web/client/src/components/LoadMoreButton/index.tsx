import "./styles.css";

interface LoadMoreButtonProps {
  onClick: () => void;
}

const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="load-more-button">
      Load more
    </button>
  );
};

export default LoadMoreButton;
