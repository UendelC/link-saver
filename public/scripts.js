const ul = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.querySelector('form');

async function load() {
    const res = await fetch("http://localhost:3000").then(data => data.json());
    res.urls.map(url => addElement(url));
}

async function posta({ name, url }) {
    console.log("teste");
    await fetch(`http://localhost:3000/?name=${name}&url=${url}`);
}

async function deleta({ name, url }) {
    await fetch(`http://localhost:3000/?name=${name}&url=${url}&del=${1}`);
}

load();


function addElement({ name, url }) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const trash = document.createElement('span');

    a.href = url;
    a.innerHTML = name;
    a.target = "_blank";

    trash.innerHTML = "x";
    trash.onclick = () => removeElement(trash, url);

    li.append(a);
    li.append(trash);
    ul.append(li);

}


function removeElement(el, url) {
    if (confirm('Tem certeza que deseja deletar?')) {
        el.parentNode.remove();
        deleta({ url });
    }

}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input;

    if (!value) {
        return alert('Preencha o campo');
    }

    const [name, url] = value.split(",");

    if (!url) {
        return alert('url não encontrada');
    }

    if (!/^http/.test(url)) {
        return alert("Digite a url da maneira correta");
    }

    addElement({ name, url });
    posta({ name, url });

    input.value = "";

});