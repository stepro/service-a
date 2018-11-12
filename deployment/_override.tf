#
# GENERATED FILE - DO NOT EDIT
#

provider "azurerm" {}
variable "resource_group" {}
variable "default_location" {}

resource "azurerm_resource_group" "default" {
  name     = "${var.resource_group}"
  location = "${var.default_location}"
}

resource "random_string" "unique_suffix" {
  length  = 4
  upper   = false
  special = false

  keepers = {
    resource_group = "${var.resource_group}"
  }
}

resource "azurerm_app_service_plan" "service_a_plan" {
  name                = "service-a-plan"
  resource_group_name = "${azurerm_resource_group.default.name}"
  location            = "${azurerm_resource_group.default.location}"

  sku {
    tier = "Free"
    size = "F1"
  }
}

resource "azurerm_app_service" "service_a" {
  name                = "service-a-${random_string.unique_suffix.result}"
  resource_group_name = "${azurerm_app_service_plan.service_a_plan.resource_group_name}"
  location            = "${azurerm_app_service_plan.service_a_plan.location}"
  app_service_plan_id = "${azurerm_app_service_plan.service_a_plan.id}"
}

resource "azurerm_redis_cache" "redis" {
  name                = "service-a-${random_string.unique_suffix.result}"
  resource_group_name = "${azurerm_resource_group.default.name}"
  location            = "${azurerm_resource_group.default.location}"
  sku_name            = "Basic"
  family              = "C"
  capacity            = 0
  redis_configuration = {}
}
