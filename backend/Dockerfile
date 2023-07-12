FROM php:8.2-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    && docker-php-ext-install pdo_mysql
    
WORKDIR /app

COPY . /app

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
