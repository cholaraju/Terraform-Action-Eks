# 🚀 Terraform GitHub Action

A custom GitHub Action that performs Terraform CLI operations with `--no-color` for clean CI logs. Supports:

- `init`
- `validate`
- `plan`
- `apply`
- `output`
- `import`

## 📦 Inputs

| Name             | Required | Description                                              |
|------------------|----------|----------------------------------------------------------|
| `tf-action`      | ✅       | The Terraform action to perform (`init`, `plan`, etc.)  |
| `import-address` | ❌       | Address of the resource (only for `import`)             |
| `import-id`      | ❌       | Resource ID to import (only for `import`)               |

## 🧰 Example Usage

```yaml
jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.7.5

      - name: Run Terraform Init
        uses: ./github/actions/terraform
        with:
          tf-action: init

      - name: Run Terraform Plan
        uses: ./github/actions/terraform
        with:
          tf-action: plan

      - name: Run Terraform Apply
        uses: ./github/actions/terraform
        with:
          tf-action: apply

      - name: Terraform Output
        uses: ./github/actions/terraform
        with:
          tf-action: output

      - name: Terraform Import
        uses: ./github/actions/terraform
        with:
          tf-action: import
          import-address: "aws_instance.example"
          import-id: "i-1234567890abcdef0"
