const axios = require('axios')

class ShippingService {
  static async createShipment(orderData) {
    try {
      // UPS API endpoint
      const upsEndpoint = process.env.UPS_API_ENDPOINT
      const upsApiKey = process.env.UPS_API_KEY

      const shipmentData = {
        ShipmentRequest: {
          Request: {
            RequestOption: 'nonvalidate'
          },
          Shipment: {
            Description: `PCB Siparişi - ${orderData.orderNumber}`,
            Shipper: {
              Name: 'PCB Tasarım',
              ShipperNumber: process.env.UPS_SHIPPER_NUMBER,
              Address: {
                AddressLine: process.env.COMPANY_ADDRESS,
                City: process.env.COMPANY_CITY,
                PostalCode: process.env.COMPANY_POSTAL_CODE,
                CountryCode: 'TR'
              }
            },
            ShipTo: {
              Name: orderData.user.name,
              Address: {
                AddressLine: orderData.shipping.address,
                City: orderData.shipping.city,
                PostalCode: orderData.shipping.postalCode,
                CountryCode: 'TR'
              }
            },
            Package: {
              PackagingType: {
                Code: '02',
                Description: 'Package'
              },
              Dimensions: {
                UnitOfMeasurement: {
                  Code: 'CM'
                },
                Length: '30',
                Width: '20',
                Height: '10'
              },
              Weight: {
                UnitOfMeasurement: {
                  Code: 'KGS'
                },
                Weight: '1'
              }
            }
          }
        }
      }

      const response = await axios.post(upsEndpoint, shipmentData, {
        headers: {
          'AccessLicenseNumber': upsApiKey,
          'Content-Type': 'application/json'
        }
      })

      return response.data
    } catch (error) {
      throw new Error('Kargo oluşturma hatası')
    }
  }

  static async trackShipment(trackingNumber) {
    try {
      const upsEndpoint = `${process.env.UPS_API_ENDPOINT}/track`
      const upsApiKey = process.env.UPS_API_KEY

      const response = await axios.get(upsEndpoint, {
        params: {
          trackingNumber
        },
        headers: {
          'AccessLicenseNumber': upsApiKey
        }
      })

      return response.data
    } catch (error) {
      throw new Error('Kargo takip hatası')
    }
  }
}

module.exports = ShippingService 