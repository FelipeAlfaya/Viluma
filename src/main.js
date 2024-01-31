document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar')

  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      navbar.classList.add('scroll')
    } else {
      navbar.classList.remove('scroll')
    }
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar')
  const menuIcon = document.getElementById('menu-icon')
  const navLinks = document.getElementById('nav-links')

  menuIcon.addEventListener('click', function () {
    navLinks.classList.toggle('show')
  })

  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      navbar.classList.add('scroll')
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show')
      }
    } else {
      navbar.classList.remove('scroll')
    }
  })
})

function validarEmail(email) {
  console.log('Validando email:', email)
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regexEmail.test(email)
}

function validarTelefone(telefone) {
  console.log('Validando telefone:', telefone)
  const regexTelefone =
    /^(\+\d{1,2}\s?)?(\()?\d{2,3}(\))?[.\s]?\d{3,4}[.\s]?\d{4}$/
  return regexTelefone.test(telefone)
}

const form = document.getElementById('form')

if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault() // Evita o envio padrão do formulário
    if (validarFormulario()) {
      enviarDados()
    }
  })
}

function validarFormulario() {
  console.log('Validando formulário')

  const emailInput = document.getElementById('emailInput').value
  const telefoneInput = document.getElementById('telefoneInput').value

  if (!emailInput.trim() || !validarEmail(emailInput)) {
    alert('Por favor, preencha o campo de e-mail com um e-mail válido.')
    return false
  }

  if (!telefoneInput.trim() || !validarTelefone(telefoneInput)) {
    alert('Por favor, preencha o campo de telefone com um número válido.')
    return false
  }

  alert('Formulário enviado com sucesso!')
  return true
}

function enviarDados() {
  console.log('enviando dados')
  const nome = document.getElementById('nomeInput').value
  const emailInput = document.getElementById('emailInput').value
  const telefoneInput = document.getElementById('telefoneInput').value
  const message = document.getElementById('message').value

  const formData = {
    nome,
    emailInput,
    telefoneInput,
    message,
  }

  fetch(
    'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTY4MDYzNDA0Mzc1MjZjNTUzMjUxMzUi_pc',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })

  const nomeClear = document.getElementById('nomeInput')
  const emailClear = document.getElementById('emailInput')
  const telefoneClear = document.getElementById('telefoneInput')
  const messageClear = document.getElementById('message')

  nomeClear.value = ''
  emailClear.value = ''
  telefoneClear.value = ''
  messageClear.value = ''

  return false
}
