let corAtual = 'black';
let canvasTela = document.querySelector('#tela');
let ctx = canvasTela.getContext('2d');
let desenhando = false;
let mouseX = 0;
let mouseY = 0;
let linha = 6;
let selectLinha = document.querySelector('.selectnumber')
selectLinha.addEventListener('input', pegarNumero);
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClick);
})
canvasTela.addEventListener('mousedown', mouseDown);
canvasTela.addEventListener('mousemove', mouseMove);
canvasTela.addEventListener('mouseup', mouseUp);
document.querySelector('.clear').addEventListener('click', limpar)
function colorClick(e){
    let cor = e.target.getAttribute('data-color');
    corAtual = cor;
    
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDown(e){
    desenhando = true;
    mouseX = e.pageX - canvasTela.offsetLeft
    mouseY = e.pageY - canvasTela.offsetTop

}

function mouseMove(e){
    if(desenhando){
        desenhar(e.pageX, e.pageY)
    }
}

function mouseUp(){
    desenhando = false;
}

function desenhar(x, y){
    let pointX = x - canvasTela.offsetLeft;
    let pointY = y - canvasTela.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = linha;
    ctx.lineJoin = 'round'
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY)
    ctx.closePath()
    ctx.strokeStyle = corAtual
    ctx.stroke()

    mouseX = pointX;
    mouseY = pointY
}

function pegarNumero(){
    let valor = selectLinha.value
    linha = valor
    document.querySelector('.number').innerHTML = `Grossura da linha: ${linha}`
}

function limpar(){
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}