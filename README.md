<div align="center"> 
<h1>Polypedia</h1>

  <img src="https://media.giphy.com/media/CRJqX2pz2RA8E/giphy.gif" alt="spirited away gif where big doors are opening one after the others" width="40%">
</div>


# What is it ?
Polypedia is a school project for polytech montpellier DO which goal is to make anyone able to deploy it's own library. 
Rather it is to make a small library with your friends or to make an online school library.
Users can create accounts, upload and find pdf to download or consults them online !


# Steps to run the project :

## Docker compose 

  ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)


lightweight config to create a polypedia full instance on any device you need. 

:warning: a reverse proxy service is not included in this setup you will had to add one to the docker compose file if you wanna use this config on a real server. 

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

### 3. Fill in the frontend and backend .env.examples
Once filled with the desired data remove the .example from both file names.


### 4. Run docker-compose 

```bash
docker-compose up
```
this command will launch 3 containers working together :

* the vue frontend container

* the rest api backend container 

* the postgres container


## k3d setup 

![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)


:warning: the included kubernetes deployment are using my dockerhub default images which include raw .env. If you wanna use your own config make sure you build tag and push to docker hub your versions of the Dockerfiles modified and modify the deployments to retrieve those images. 

## prerequisites

To run this project you will need [k3d](https://k3d.io/v5.4.6/) and [kubernetes tools](https://kubernetes.io/docs/tasks/tools/). You might want to setup [k9s](https://k9scli.io/) to manage you k3d cluster easily.


### 1. Clone the repo

```bash
git clone git@github.com:thomas-mauran/Polypedia.git
```

### 2. Open the newly cloned repo

```bash
cd Polypedia
```

### 3. File modifications 

#### api-configmap
* You need to fill the api configmap with the desired values used to override the api .env 


##### modify ingress-controller routes
* The ingress controller is set with my own server url as example. Make sure you change those values according to your domain name and DNS. 

##### modify both certificate staging / production.
* Those files are also using my example server domain names. 
Make sure you change those values according to your domain name and DNS. 

##### modify both certificate issuers staging / production
* Use your own email address in those files. 

### 4. create the k3d cluster 

``` bash
k3d cluster create polypedia --k3s-arg "--no-deploy=traefik@server:*"
```
this command is going to setup a basic k3d cluster without any traefik server. 


### 5. apply the kube files 

``` bash
kubectl apply -f kube/
```

### 6. nginx ingress controller 
``` bash
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx


helm repo update

helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace
```

### 7. Create the img and pdf folders in the cluster container


use docker ps to check the container id with the image "rancher/k3s:v1.24.4-k3s1"
``` bash
docker ps 
```

select the contained id and use it in the following command 

``` bash
docker exec -it <container id> sh 
```

once you are in the file system 

``` bash
mkdir /mnt/data/polypedia/files/img
mkdir /mnt/data/polypedia/files/pdf
```


### 8. Setup certmanager


``` bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.10.1/cert-manager.yaml

kubectl apply -f kube/
```


### 9. Open k3d cluster ports 


``` bash
k3d node edit k3d-polypedia-serverlb --port-add 80:80

k3d node edit k3d-polypedia-serverlb --port-add 443:443
```


## Questions 

You can create issues if you are having troubles seting up the project !
