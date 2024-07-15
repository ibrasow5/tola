import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Answer from './Answer';
import PostAnswer from './PostAnswer';
import '../css/Dashboard.css';

function QuestionDetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/questions/${id}`)
      .then(response => setQuestion(response.data))
      .catch(error => console.error('Error fetching question:', error));
  }, [id]);

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <div className="question-detail">
      <h2>{question.title}</h2>
      <p>{question.body}</p>
      <div className="answers">
        {question.answers.map(answer => (
          <Answer key={answer.id} answer={answer} />
        ))}
      </div>
      <PostAnswer questionId={question.id} />
    </div>
  );
}

export default QuestionDetail;
