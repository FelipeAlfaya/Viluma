document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar') as HTMLElement

  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      navbar.classList.add('scroll')
    } else {
      navbar.classList.remove('scroll')
    }
  })
})

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar') as HTMLElement
  const menuIcon = document.getElementById('menu-icon') as HTMLElement
  const navLinks = document.getElementById('nav-links') as HTMLElement

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

function validarEmail(email: string): boolean {
  console.log('Validando email:', email)
  const regexEmail: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regexEmail.test(email)
}

function validarTelefone(telefone: string): boolean {
  console.log('Validando telefone:', telefone)
  const regexTelefone: RegExp =
    /^(\+\d{1,2}\s?)?(\()?\d{2,3}(\))?[.\s]?\d{3,4}[.\s]?\d{4}$/
  return regexTelefone.test(telefone)
}

const form = document.getElementById('form')

form
  ? form.addEventListener('submit', function (event) {
      event.preventDefault() // Evita o envio padrão do formulário
      if (validarFormulario()) {
        enviarDados()
      }
    })
  : null

function validarFormulario(): boolean {
  console.log('Validando formulário')

  const emailInput: string = (
    document.getElementById('emailInput') as HTMLInputElement
  ).value
  const telefoneInput: string = (
    document.getElementById('telefoneInput') as HTMLInputElement
  ).value

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
  const nome = (document.getElementById('nomeInput') as HTMLInputElement).value
  const emailInput: string = (
    document.getElementById('emailInput') as HTMLInputElement
  ).value
  const telefoneInput: string = (
    document.getElementById('telefoneInput') as HTMLInputElement
  ).value
  const message: string = (
    document.getElementById('message') as HTMLInputElement
  ).value

  const formData = {
    nome,
    emailInput,
    telefoneInput,
    message,
  }

  fetch(
    'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTY5MDYzZTA0M2Q1MjZhNTUzNjUxMzEi_pc',
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

  const nomeClear: HTMLInputElement = document.getElementById(
    'nomeInput'
  ) as HTMLInputElement
  const emailClear: HTMLInputElement = document.getElementById(
    'emailInput'
  ) as HTMLInputElement
  const telefoneClear: HTMLInputElement = document.getElementById(
    'telefoneInput'
  ) as HTMLInputElement
  const messageClear: HTMLInputElement = document.getElementById(
    'message'
  ) as HTMLInputElement

  nomeClear.value = ''
  emailClear.value = ''
  telefoneClear.value = ''
  messageClear.value = ''

  return false
}
