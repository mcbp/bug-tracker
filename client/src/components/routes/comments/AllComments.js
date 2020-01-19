import React, { useEffect } from 'react'
import Moment from 'react-moment'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { loadComments, clearComments } from '../../../actions/commentActions'

const AllComments = props => {

  const { loadComments, comments, currentTicket, clearComments, isLoading } = props

  useEffect(() => {
    loadComments(currentTicket)
    return () => clearComments()
  }, [currentTicket, loadComments, clearComments])

  const CommentContainer = styled.div`
    & > *:last-child {
      border-bottom: 0 !important;
    }
  `
  const Comment = styled.div`
    border-bottom: 1px solid #ccc;
    margin-top: 10px;
    padding-bottom: 10px;
    & .comment-header {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      & > h6 { margin-right: 20px;}
      & > * { margin: 0; }
      & > span { color: #888; }
    }
    & > div { padding: 5px 0 8px; }
    & .comment-body { white-space: pre-wrap; }
  `

  const NoComments = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 35px;
  `

  if (isLoading) return null

  if (!comments.length && !isLoading) return <NoComments>No comments</NoComments>

  return (
    <CommentContainer className="module full-width">
      {comments.map(comment => {
        return (
          <Comment key={comment._id}>
            <div className="comment-header">
              <h6>{comment.submitter.name}</h6>
              <span><Moment date={comment.creation_date} format="DD/MM/YY HH:mm"/></span>
            </div>
            <div className="comment-body">{comment.text}</div>
          </Comment>
        )
      })}
    </CommentContainer>
  )
}

const mapStateToProps = state => {
  return {
    isLoading: state.comment.isLoading,
    comments: state.comment.comments,
    currentTicket: state.ticket.currentTicket._id
  }
}

export default connect(mapStateToProps, { loadComments, clearComments })(AllComments)
