resource "azurerm_app_service_plan" "service_a_plan" {
    sku {
        tier = "Standard"
        size = "S2"
    }
}
