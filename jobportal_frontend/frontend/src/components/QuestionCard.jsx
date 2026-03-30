function QuestionCard({ q, index }) {
  return (
    <div>
      <h4>{q.question}</h4>
      {q.options.map((opt, i) => (
        <label key={i}>
          <input type="radio" name={index} /> {opt}
        </label>
      ))}
    </div>
  );
}

export default QuestionCard;