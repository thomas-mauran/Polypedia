<div align="center"> 
<h1>Polypedia</h1>

  <img src="https://media.giphy.com/media/CRJqX2pz2RA8E/giphy.gif" alt="spirited away gif where big doors are opening one after the others" width="40%">
</div>


# What is it ?
Polypedia is a school project for polytech montpellier DO which goal is to make anyone able to deploy it's own library. 
Rather it is to make a small library with your friends or to make an online school library.
Users can create accounts, upload and find pdf to download or consults them online !


# Steps to run the project :

## prerequisites

To run this project you must have installed [docker-compose](https://docs.docker.com/compose/install) and [docker](https://docs.docker.com/get-docker/) on your machine 

### 1. Clone the repo

```bash
git clone git@github.com:thomas-mauran/Polypedia.git
```

### 2. Open the newly cloned repo

```bash
cd Polypedia
```

### 3. Run docker-compose 

```bash
docker-compose up
```
this command will launch 3 containers working together :

* the vue frontend container

* the rest api backend container 

* the postgres container




  
 






