# Objetivo do Projeto

<h2>Criar uma api que rode um Crawler para obter os numeros dos beneficios a partir de um CPF<h2>
<hr>
<h2>Tecnologias Utlizadas<h2>
<ul>
<li> AdonisJS (API)
<li> Puppeteer (Crawler)
<li> Japa (testes)
</ul>



# Intruções para rodar o projeto

#### 1- Você deve ter um API CLIENT em sua máquina EX(INSOMNIA, POSTMAN)

<hr>

#### 2- Você deve instalar as dependencias
```
npm install
```
<hr>

#### 3-  Para rodar o projeto execute o comando abaixo:
```bash  
npm run dev
```
#### Para rodar os testes execute o comando abaixo:
```bash 
node ace teste
```

<hr>

# Instruções para usar a API

</br>

## Exemplos de respostas de erros da api:

**Para campos requeridos** :

### Ex: 

```
{
  "statusCode": 422
	"errors": [
		{
			"rule": "required",
			"field": "login",
			"message": "login is required"
		},
		{
			"rule": "required",
			"field": "password",
			"message": "password is required"
		},
		{
			"rule": "required",
			"field": "cpf",
			"message": "cpf is required"
		}
	]
}

```

</br>


**Para erros de tipos diferentes nos valores dos campos passados**:

### Ex:

```
{
"statusCode": 422
"errors": [
		{
			"rule": "string",
			"field": "login",
			"message": "string validation failed"
		},
		{
			"rule": "string",
			"field": "password",
			"message": "string validation failed"
		},
		{
			"rule": "string",
			"field": "cpf",
			"message": "string validation failed"
		}
	]
}

```

</br>


**Para erro de cpf invalido**:

### Ex: 

```
{
"statusCode": 402,
"errors": [
		{
			"rule": "regex",
			"field": "cpf",
			"message": "Invalid CPF Format example: 000.000.000-13"
		}
	]
}

```



</br>

Rotas: 
- [/](#login) 

----------------------

<div id="login">

  ## Método POST na rota /

 #### Body da requisição esperado JSON
  
### EXEMPLO:

```
{
	"login": "testekonsi",
	"password": "testekonsi",
	"cpf": "873.662.745-34"
}
```
  
 *Resposta da api: JSON*

**OBS** *Todos os campos são obrigatórios, se não existir um login valido ira retornar um json acusando um erro.*
```
{
   "statusCode": 404,
	"response": "Invalid Login"
}

```

**OBS** *Se não for encontrado um numero de beneficio com o CPF passado ira retornar um json avisando que nao foi encontrada a matrícula.*


```
{
  "statusCode": 200,
	"response": "Matrícula não encontrada!"
}
```

**OBS** *Se for encontrado um numero de  beneficio com o CPF passado ira retornar um json com um array de numeros.*


```
{
  "statusCode": 200,
	"response": [
		"1734164104"
	]
}
```

  
</div>





