import React, { useState, useEffect, Fragment } from 'react'
import ErrorMessage from '../../bits/ErrorMessage'
import { connect } from 'react-redux'
import { createComment } from '../../../actions/commentActions'
import { clearErrors } from '../../../actions/errorActions'

const NewComment = props => {

  const { createComment, clearErrors, ticket, submitter, error } = props

  const [text, setText] = useState("")
  const [msg, setMsg] = useState("")

  useEffect(() => {
    if (error.id === 'CREATE_COMMENT_FAIL') {
      setMsg(error.msg)
    } else {
      setMsg("")
    }
  }, [error])

  useEffect(() => {
    return () => clearErrors()
  }, [clearErrors])

  return (
    <Fragment>
      { msg && <ErrorMessage msg={msg} />}

      <form className="col s12 purple-form">
        <div className="row">

          <div className="input-field col s12">
            <textarea id="c-body" type="text" className="materialize-textarea"
              value={text}
              onChange={e => setText(e.target.value)}
            />
            <label htmlFor="c-body">Your comment...</label>
          </div>

        </div>
      </form>

      <button className="btn purp"
        onClick={() =>  {
          clearErrors()
          createComment(ticket, submitter, text)
          setText("")
        }}
      >Post comment</button>

    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    submitter: state.auth.user._id,
    ticket: state.ticket.currentTicket._id,
    error: state.error
  }
}

export default connect(mapStateToProps, { createComment, clearErrors })(NewComment)
