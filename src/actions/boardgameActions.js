export const searchGame = (search_term) => {
  let postConfig = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Accepts': 'application/json',
    },
    body: JSON.stringify({ search_term  })
  }

  fetch(`${process.env.REACT_APP_API_ENDPOINT}/search`, postConfig)
    .then(res => res.json())
	.then(r => console.log(r))
}
