const updateButton = document.getElementById('update');
const name = document.getElementById("name").value;
const quate = document.getElementById("qute").value;
console.log(quate);

updateButton.addEventListener('click',()=>{
    fetch('quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'name': 'Darth Vader',
          'quote': 'I find your lack of faith disturbing.'
        })
      }).then(res=> console.log(res))
});

var del = document.getElementById('delete')

del.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})