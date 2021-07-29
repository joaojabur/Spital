import "./styles.css";

interface LoadMoreButtonProps {
  onClick: () => void;
}

const LoadMoreButton = ({ onClick }: LoadMoreButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="load-more-button">
      Carregar mais
    </button>
  );
};

export default LoadMoreButton;
