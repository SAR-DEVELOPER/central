# FormKAP - KAP-Specific Client Lists

This form supports 9 different KAP (Kantor Akuntan Publik) configurations, each with its own set of client companies.

## Usage

Access the form with a `kap` query parameter to specify which KAP's client list should be displayed:

- `/formKAP?kap=kap1` - KAP 1 client list
- `/formKAP?kap=kap2` - KAP 2 client list
- `/formKAP?kap=kap3` - KAP 3 client list
- `/formKAP?kap=kap4` - KAP 4 client list
- `/formKAP?kap=kap5` - KAP 5 client list
- `/formKAP?kap=kap6` - KAP 6 client list
- `/formKAP?kap=kap7` - KAP 7 client list
- `/formKAP?kap=kap8` - KAP 8 client list
- `/formKAP?kap=kap9` - KAP 9 client list

If no `kap` parameter is provided, the form will show all 78 companies by default.

## Configuration

The KAP-to-client mappings are defined in `form-disertasi/constants/kapClients.ts`. You can update the `KAP_CLIENT_MAPPING` object to assign specific companies to each KAP.

## Features

- **Pre-filled KAP Field**: When a `kap` query parameter is provided, the "Nama Kantor Akuntan Publik (KAP)" field is automatically pre-filled with the KAP name and disabled to prevent changes
- **Searchable Dropdown**: The "Nama Klien KAP" field uses a searchable dropdown that filters companies as you type
- **KAP-Specific Lists**: Each KAP link shows only the companies assigned to that KAP
- **String Submission**: The selected company name is submitted as a string, maintaining compatibility with the backend

## Backend

The backend entity (`Form2Response`) includes the `namaKlienKAP` field to store the selected client company name.

