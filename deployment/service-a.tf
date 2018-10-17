provider "azurerm" {}

resource "azurerm_app_service" "service_a" {
    app_settings {
        REDIS_HOST = "${azurerm_redis_cache.redis.hostname}"
        REDIS_PORT = "${azurerm_redis_cache.redis.ssl_port}"
        REDIS_KEY = "${azurerm_redis_cache.redis.primary_access_key}"
    }
}

resource "azurerm_redis_cache" "redis" {}