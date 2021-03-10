/*
 * © 2020 ThoughtWorks, Inc. All rights reserved.
 */

import { AWS_REGIONS } from '../services/aws/AWSRegions'
import { GCP_REGIONS } from '../services/gcp/GCPRegions'
import { AZURE_REGIONS } from '../services/azure/AzureRegions'

type CloudConstantsByProvider = {
  SSDCOEFFICIENT: number
  HDDCOEFFICIENT: number
  MIN_WATTS: number
  MAX_WATTS: number
  PUE_AVG: number
  NETWORKING_COEFFICIENT: number
  PUE_TRAILING_TWELVE_MONTH?: { [key: string]: number }
  getPUE: (region?: string) => number
  AVG_CPU_UTILIZATION_2020: number
}

type CloudConstants = {
  [cloudProvider: string]: CloudConstantsByProvider
}

export const CLOUD_CONSTANTS: CloudConstants = {
  GCP: {
    SSDCOEFFICIENT: 1.2, // watt hours / terabyte hour
    HDDCOEFFICIENT: 0.65, // watt hours / terabyte hour
    MIN_WATTS: 0.58,
    MAX_WATTS: 3.54,
    NETWORKING_COEFFICIENT: 0.001, // kWh / Gb
    PUE_AVG: 1.1,
    PUE_TRAILING_TWELVE_MONTH: {
      [GCP_REGIONS.US_EAST1]: 1.102,
      [GCP_REGIONS.US_CENTRAL1]: 1.11,
      [GCP_REGIONS.US_CENTRAL2]: 1.12,
      [GCP_REGIONS.US_WEST1]: 1.095,
      [GCP_REGIONS.EUROPE_WEST1]: 1.08,
      [GCP_REGIONS.EUROPE_WEST4]: 1.09,
      [GCP_REGIONS.EUROPE_NORTH1]: 1.09,
      [GCP_REGIONS.ASIA_EAST1]: 1.13,
      [GCP_REGIONS.ASIA_SOUTHEAST1]: 1.14,
      [GCP_REGIONS.SOUTHAMERICA_EAST1]: 1.09,
    },
    getPUE: (region: string) => {
      return CLOUD_CONSTANTS.GCP.PUE_TRAILING_TWELVE_MONTH[region]
        ? CLOUD_CONSTANTS.GCP.PUE_TRAILING_TWELVE_MONTH[region]
        : CLOUD_CONSTANTS.GCP.PUE_AVG
    },
    AVG_CPU_UTILIZATION_2020: 50,
  },
  AWS: {
    SSDCOEFFICIENT: 1.2, // watt hours / terabyte hour
    HDDCOEFFICIENT: 0.65, // watt hours / terabyte hour
    MIN_WATTS: 0.59,
    MAX_WATTS: 3.5,
    NETWORKING_COEFFICIENT: 0.001, // kWh / Gb
    PUE_AVG: 1.2,
    getPUE: () => {
      return CLOUD_CONSTANTS.AWS.PUE_AVG
    },
    AVG_CPU_UTILIZATION_2020: 50,
  },
  AZURE: {
    SSDCOEFFICIENT: 1.2, // watt hours / terabyte hour
    HDDCOEFFICIENT: 0.65, // watt hours / terabyte hour
    MIN_WATTS: 0.74,
    MAX_WATTS: 4.13,
    NETWORKING_COEFFICIENT: 0.001, // kWh / Gb
    PUE_AVG: 1.125,
    getPUE: () => {
      return CLOUD_CONSTANTS.AZURE.PUE_AVG
    },
    AVG_CPU_UTILIZATION_2020: 50,
  },
}

const US_NERC_REGIONS_EMISSIONS_FACTORS: { [nercRegion: string]: number } = {
  RFC: 0.000475105,
  SERC: 0.0004545,
  WECC: 0.000351533,
  MRO: 0.000540461,
}

export const CLOUD_PROVIDER_EMISSIONS_FACTORS_METRIC_TON_PER_KWH: {
  [cloudProvider: string]: { [region: string]: number }
} = {
  AWS: {
    [AWS_REGIONS.US_EAST_1]: US_NERC_REGIONS_EMISSIONS_FACTORS.SERC,
    [AWS_REGIONS.US_EAST_2]: US_NERC_REGIONS_EMISSIONS_FACTORS.RFC,
    [AWS_REGIONS.US_WEST_1]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [AWS_REGIONS.US_WEST_2]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [AWS_REGIONS.US_GOV_EAST_1]: US_NERC_REGIONS_EMISSIONS_FACTORS.SERC,
    [AWS_REGIONS.US_GOV_WEST_1]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [AWS_REGIONS.AF_SOUTH_1]: 0.000928,
    [AWS_REGIONS.AP_EAST_1]: 0.00081,
    [AWS_REGIONS.AP_SOUTH_1]: 0.000708,
    [AWS_REGIONS.AP_NORTHEAST_3]: 0.000506,
    [AWS_REGIONS.AP_NORTHEAST_2]: 0.0005,
    [AWS_REGIONS.AP_SOUTHEAST_1]: 0.0004085,
    [AWS_REGIONS.AP_SOUTHEAST_2]: 0.00079,
    [AWS_REGIONS.AP_NORTHEAST_1]: 0.000506,
    [AWS_REGIONS.CA_CENTRAL_1]: 0.00013,
    [AWS_REGIONS.CN_NORTH_1]: 0.000555,
    [AWS_REGIONS.CN_NORTHWEST_1]: 0.000555,
    [AWS_REGIONS.EU_CENTRAL_1]: 0.000338,
    [AWS_REGIONS.EU_WEST_1]: 0.000316,
    [AWS_REGIONS.EU_WEST_2]: 0.000228,
    [AWS_REGIONS.EU_SOUTH_1]: 0.000233,
    [AWS_REGIONS.EU_WEST_3]: 0.000052,
    [AWS_REGIONS.EU_NORTH_1]: 0.000008,
    [AWS_REGIONS.ME_SOUTH_1]: 0.000732,
    [AWS_REGIONS.SA_EAST_1]: 0.000074,
  },
  GCP: {
    [GCP_REGIONS.US_CENTRAL1]: US_NERC_REGIONS_EMISSIONS_FACTORS.MRO,
    [GCP_REGIONS.US_CENTRAL2]: US_NERC_REGIONS_EMISSIONS_FACTORS.MRO,
    [GCP_REGIONS.US_EAST1]: US_NERC_REGIONS_EMISSIONS_FACTORS.SERC,
    [GCP_REGIONS.US_EAST4]: US_NERC_REGIONS_EMISSIONS_FACTORS.SERC,
    [GCP_REGIONS.US_WEST1]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [GCP_REGIONS.US_WEST2]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [GCP_REGIONS.US_WEST3]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [GCP_REGIONS.US_WEST4]: US_NERC_REGIONS_EMISSIONS_FACTORS.WECC,
    [GCP_REGIONS.ASIA_EAST1]: 0.000509,
    [GCP_REGIONS.ASIA_EAST2]: 0.00081,
    [GCP_REGIONS.ASIA_NORTHEAST1]: 0.000506,
    [GCP_REGIONS.ASIA_NORTHEAST2]: 0.000506,
    [GCP_REGIONS.ASIA_NORTHEAST3]: 0.0005,
    [GCP_REGIONS.ASIA_SOUTH1]: 0.000708,
    [GCP_REGIONS.ASIA_SOUTHEAST1]: 0.0004085,
    [GCP_REGIONS.ASIA_SOUTHEAST2]: 0.000761,
    [GCP_REGIONS.AUSTRALIA_SOUTHEAST1]: 0.00079,
    [GCP_REGIONS.EUROPE_NORTH1]: 0.000086,
    [GCP_REGIONS.EUROPE_WEST1]: 0.000167,
    [GCP_REGIONS.EUROPE_WEST2]: 0.000228,
    [GCP_REGIONS.EUROPE_WEST3]: 0.000338,
    [GCP_REGIONS.EUROPE_WEST4]: 0.00039,
    [GCP_REGIONS.EUROPE_WEST6]: 0.00001182,
    [GCP_REGIONS.NORTHAMERICA_NORTHEAST1]: 0.00013,
    [GCP_REGIONS.SOUTHAMERICA_EAST1]: 0.000074,
    [GCP_REGIONS.UNKNOWN]: 0.0004108907, // Average of the above regions
  },
  AZURE: {
    [AZURE_REGIONS.UK_SOUTH]: 0.000228,
  },
}

export function estimateCo2(
  estimatedWattHours: number,
  cloudProvider: string,
  region: string,
): number {
  return (
    estimatedWattHours *
    CLOUD_PROVIDER_EMISSIONS_FACTORS_METRIC_TON_PER_KWH[cloudProvider][region]
  )
}
