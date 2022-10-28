const songtops = [
    {
        id: 'song-top-1',
        'hourly-rating': [
            {'hour':1,'percent':0.015},
            {'hour':2,'percent':0.011},
            {'hour':3,'percent':0.012},
            {'hour':4,'percent':0.013},
            {'hour':5,'percent':0.012},
            {'hour':6,'percent':0.02},
            {'hour':7,'percent':0.063},
            {'hour':8,'percent':0.068},
            {'hour':9,'percent':0.067},
            {'hour':10,'percent':0.066},
            {'hour':11,'percent':0.062},
            {'hour':12,'percent':0.063},
            {'hour':13,'percent':0.049},
            {'hour':14,'percent':0.046},
            {'hour':15,'percent':0.044},
            {'hour':16,'percent':0.044},
            {'hour':17,'percent':0.052},
            {'hour':18,'percent':0.055},
            {'hour':19,'percent':0.053},
            {'hour':20,'percent':0.051},
            {'hour':21,'percent':0.039},
            {'hour':22,'percent':0.032},
            {'hour':23,'percent':0.025}
        ],
        info: {
            name: 'Ân tình sang trang',
            artist: ['Châu khải phong', 'acv'],
            cover: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/4/9/6/f/496fa84f1a008e3fa51668545deb33ca.jpg'
        },
        style: {
            backgroundColor: 'white',
            borderColor: '#5F5ED8',
            pointHoverBorderColor: 'white',
            pointHoverBackgroundColor: '#5F5ED8',
            color: '#5F5ED8'
        }
    },
    {
        id: 'song-top-2',
        'hourly-rating': [
            {'hour':1,'percent':0.012},
            {'hour':2,'percent':0.008},
            {'hour':3,'percent':0.009},
            {'hour':4,'percent':0.010},
            {'hour':5,'percent':0.009},
            {'hour':6,'percent':0.017},
            {'hour':7,'percent':0.06},
            {'hour':8,'percent':0.065},
            {'hour':9,'percent':0.064},
            {'hour':10,'percent':0.063},
            {'hour':11,'percent':0.040},
            {'hour':12,'percent':0.0360},
            {'hour':13,'percent':0.036},
            {'hour':14,'percent':0.033},
            {'hour':15,'percent':0.027},
            {'hour':16,'percent':0.03},
            {'hour':17,'percent':0.030},
            {'hour':18,'percent':0.033},
            {'hour':19,'percent':0.043},
            {'hour':20,'percent':0.037},
            {'hour':21,'percent':0.032},
            {'hour':22,'percent':0.022},
            {'hour':23,'percent':0.0160}
        ],
        info: {
            name: 'Thế giới trong em',
            artist: ['Hương ly', 'L.Y.M'],
            cover: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/b/2/3/5/b23523f74ca4b55e1774fd8a7b468977.jpg'
        },
        style: {
            backgroundColor: 'white',
            borderColor: '#53D0BB',
            pointHoverBorderColor: 'white',
            pointHoverBackgroundColor: '#53D0BB',
            color: '#53D0BB'
        }

    },
    {
        id: 'song-top-3',
        'hourly-rating': [
            {'hour':1,'percent':0.005},
            {'hour':2,'percent':0.004},
            {'hour':3,'percent':0.003},
            {'hour':4,'percent':0.006},
            {'hour':5,'percent':0.005},
            {'hour':6,'percent':0.013},
            {'hour':7,'percent':0.02},
            {'hour':8,'percent':0.060},
            {'hour':9,'percent':0.060},
            {'hour':10,'percent':0.04},
            {'hour':11,'percent':0.030},
            {'hour':12,'percent':0.030},
            {'hour':13,'percent':0.03},
            {'hour':14,'percent':0.01},
            {'hour':15,'percent':0.01},
            {'hour':16,'percent':0.02},
            {'hour':17,'percent':0.03},
            {'hour':18,'percent':0.04},
            {'hour':19,'percent':0.03},
            {'hour':20,'percent':0.03},
            {'hour':21,'percent':0.02},
            {'hour':22,'percent':0.01},
            {'hour':23,'percent':0.01}
        ],
        info: {
            name: 'Em lấy chồng',
            artist: ['Khắc việt', 'ACV'],
            cover: 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_webp/cover/5/1/5/e/515ee410d55fd71ae7c59e13f57ae47f.jpg'
        },
        style: {
            backgroundColor: 'white',
            borderColor: '#E35050',
            pointHoverBorderColor: 'white',
            pointHoverBackgroundColor: '#E35050',
            color: '#E35050'
        }

    }
]

const horizontalAxis = songtops[0]["hourly-rating"].map(item => item.hour);

const data = {
    labels: horizontalAxis.map(item => {
        return item >= 10 ? `${item}:00` : `0${item}:00`
    }),
    datasets: songtops.map(song => ({
        data: song["hourly-rating"].map(x => x.percent),
        label: song.id,
        borderWidth: 1.6,
        backgroundColor: song.style.backgroundColor,
        pointRadius: 5,
        pointBorderWidth: 3.5,
        borderColor: song.style.borderColor,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 3,
        pointHoverBorderColor: song.style.pointHoverBorderColor,
        pointHoverBackgroundColor: song.style.pointHoverBackgroundColor,
    }))
};

const config = {
    type: 'line',
    data: data,
    options: {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false,
                external: externalTooltipHandler
            }
        },
        
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#A0A0A0',
                    maxTicksLimit: 12,
                    font: {
                        size: 12
                    },
                    maxRotation: 0,
                    minRotation: 0
                }
            },
            y: {
                grid: {
                    borderDash: [1,5],
                    color: 'rgba(255, 255, 255, 0.3)',
                    drawTicks: false,
                    borderColor: 'transparent'
                },
                ticks: {
                    display: false
                }
            }
        }
    }
};

function getOrCreateTooltipElement(chart) {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');
    if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        setStyleOnElement(tooltipEl, {
            position : 'absolute',
            display : 'flex'
        })

        chart.canvas.parentNode.appendChild(tooltipEl);
    }
    
    return tooltipEl;
}

function createContent(song) {
    let div = document.createElement('div');

    const img = document.createElement('img');
    img.src = song.info.cover;
    setStyleOnElement(img, {
        height : '37px',
        width : '37px',
        borderRadius : '3px'
    })

    const contentDiv = document.createElement('div');
    const textStyle = {
        color : 'white',
        overflow: 'hidden',
        whiteSpace: 'nowrap',       
        textOverflow: 'ellipsis',
        textTransform: 'capitalize'
    }

    const title = document.createElement('h3');
    title.innerHTML = song.info.name;
    setStyleOnElement(title, {
        fontSize : '12px',
        ...textStyle
    })
    
    const subtitle = document.createElement('span');
    subtitle.innerHTML = song.info.artist;
    setStyleOnElement(subtitle, {
        fontSize : '11px',
        display : 'block',
        opacity: 0.7,
        ...textStyle
    });
    

    contentDiv.append(title, subtitle);
    setStyleOnElement(contentDiv, {
        flex: 1,
        marginLeft: '5px',
        minWidth: '0px'
    })

    const percent = document.createElement('h3');
    percent.innerHTML = song['hourly-rating'].at(-1).percent * 100 + '%';
    setStyleOnElement(percent, {
        fontSize : '14px',
        color : 'white',
        marginRight: '5px',
        marginLeft: '10px'
    })
    
    
    div.append(img, contentDiv, percent);
    setStyleOnElement(div, {
        display : 'flex',
        alignItems : 'center',
        backgroundColor : song.style.color,
        borderRadius : '5px',
        minWidth : '200px',
        maxWidth : '230px',
        padding : '5px 5px'
        
    })

    let divWrap = document.createElement('div');
    divWrap.append(div);
    return divWrap.innerHTML;
}

function setStyleOnElement(element, styles) {
    Object.assign(element.style, styles)
}

function externalTooltipHandler(context) {
    const {chart, tooltip} = context;
    const tooltipElement = getOrCreateTooltipElement(chart);

    const idSongTop = tooltip.dataPoints[0].dataset.label;
    const [songTop] = songtops.filter(song => song.id === idSongTop);

    tooltipElement.innerHTML = createContent(songTop);

    if (tooltip.opacity === 0) {
        tooltipElement.style.opacity = 0;
        return;
    }

    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
    setStyleOnElement(tooltipElement, {
        opacity : 1,
        left : positionX + tooltip.caretX + 'px',
        top : positionY + tooltip.caretY + 'px'
    })
    
}

const zingchart = new Chart(
    document.getElementById('zingchart'), config
); 




