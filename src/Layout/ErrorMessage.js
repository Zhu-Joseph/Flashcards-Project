import React from 'react'

export const ErrorMessage = ({error}) => {
  return (<div>Error! check the web console {console.log(error)}</div>)
}

export default ErrorMessage