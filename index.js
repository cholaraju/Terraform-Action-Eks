const core = require('@actions/core');
const { execSync } = require('child_process');

async function run() {
  try {
    const action = core.getInput('tf-action');
    const importAddress = core.getInput('import-address');
    const importId = core.getInput('import-id');

    const runCommand = (cmd) => {
      console.log(`\n👉 Running: ${cmd}`);
      execSync(cmd, { stdio: 'inherit' });
    };

    if (action === 'init') {
      runCommand('terraform init -no-color');
    } else if (action === 'validate') {
      runCommand('terraform validate -no-color');
    } else if (action === 'plan') {
      runCommand('terraform plan -no-color');
    } else if (action === 'apply') {
      runCommand('terraform apply -auto-approve -no-color');
    } else if (action === 'output') {
      runCommand('terraform output -no-color');
    } else if (action === 'import') {
      if (!importAddress || !importId) {
        throw new Error('Both "import-address" and "import-id" are required for import action');
      }
      runCommand(`terraform import -no-color "${importAddress}" "${importId}"`);
    } else {
      throw new Error(`Unsupported action "${action}"`);
    }

    console.log('✅ Terraform action completed');
  } catch (error) {
    core.setFailed(`❌ Terraform action failed: ${error.message}`);
  }
}

run();
