const blacklist = ['tween', 'millenial', 'lit']

const getTweets = () => document.querySelectorAll('.js-tweet-text')

const redactTweets = () => {
  const tweets = getTweets()
  tweets.forEach(tweet => {
    let text = tweet.innerHTML
    blacklist.forEach(word => {
      const re = new RegExp('(' + word + ')', 'gi')
      text = text.replace(re, '<span class="twitter-redacted">$1</span>')
    })
    tweet.innerHTML = text
  })
}

window.onload = () => {
  redactTweets()
}

window.addEventListener('scroll', () => {
  redactTweets()
})