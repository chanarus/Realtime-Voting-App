const form = document.getElementById('vote-form');

//Form submit
form.addEventListener('submit', (e) => {
    const choise = document.querySelector('input[name=os]:checked').value;
    const data = { os: choise };

    fetch('http://localhost:3000/vote', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();
});

let dataPoints = [
    {label: 'Windows', y: 0},
    {label: 'Linux', y: 0},
    {label: 'IOS', y: 0},
    {label: 'Other', y: 0}
];

const chartContainer = document.querySelector('#chart-container');

if(chartContainer) {
    const chart = new  CanvasJS.Chart("chart-container", {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'Vote results'
        },
        data: [
            {
                type: "column",
                dataPoints: dataPoints
            }
        ]
    });
    chart.render();

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('fc022804a502bf4b2d33', {
      cluster: 'ap2',
      encrypted: true
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data) {
      dataPoints = dataPoints.map(x => {
          if(x.label == data.os) {
            x.y += data.points;
            return x;
          }else {
              return x;
          }
      });
      chart.render();
    });
}