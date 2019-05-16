#!/bin/bash

DOCKER_COMPOSE  = docker-compose

.DEFAULT_GOAL := help
help: 
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help 

##
##-----------------------------------------
##             P R O J E C T
##-----------------------------------------

install: ## All-in-one command to install & launch container
install: pre docker

.PHONY: install

##
##-----------------------------------------
##              D O C K E R
##-----------------------------------------

docker: build launch

build: ## Build container from image
build:
	$(DOCKER_COMPOSE) build --pull
	$(DOCKER_COMPOSE) pull

launch: ## Set container UP
launch:
	$(DOCKER_COMPOSE) up -d

clean: ## Stop container and remove generated files
clean: stop
	git clean -dfX

stop:
	$(DOCKER_COMPOSE) kill
	$(DOCKER_COMPOSE) down --volumes --remove-orphans

publish: ## Build & publish docker image on registry
publish: docker-login
	docker build ./docker/postgres/. --pull --tag sylvaindns/pg_potential-enigma
	docker push sylvaindns/pg_potential-enigma

docker-login:
	@if [ -f ~/.docker/config.json ]; \
	then\
		echo 'auth file already exists'; \
	else\
		printf "\033[33;7mPlease, enter your Docker Registry credentials.\n\033[0m"; \
		docker login; \
	fi

.PHONY: docker build launch clean stop publish docker-login

pre: docker-version .env docker-compose.yml

docker-compose.yml: docker-compose.yml.dist
	@if [ -f docker-compose.yml ]; \
	then\
		echo 'docker-compose.yml already exists';\
	else\
		echo cp docker-compose.yml.dist docker-compose.yml;\
		cp docker-compose.yml.dist docker-compose.yml;\
	fi

.env: .env.dist
	@if [ -f .env ]; \
	then\
		echo '.env already exists';\
	else\
		echo cp .env.dist .env.yml;\
		cp .env.dist .env;\
	fi

docker-version: docker-compose.yml
	docker -v
	@DOCKER_MAJOR=$(shell docker -v | sed -e 's/.*version //' -e 's/,.*//' | cut -d\. -f1) ; \
	if [ $$DOCKER_MAJOR -lt 18 ] ; then \
		printf "\033[31;7mDocker version > 18.0.0 is required.\nPlease install it and retry\nhttps://docs.docker.com/install/\n\n\033[0m"; \
		exit 1;\
	fi

.PHONY: docker-version