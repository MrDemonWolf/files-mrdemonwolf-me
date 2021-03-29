const mjml = require('mjml');

/**
 *  @param token
 *  Token for the password reset
 */
module.exports = token =>
  mjml(`<mjml>
  <mj-body background-color="#ffffff">
    <mj-section>
      <mj-column>
        <mj-text font-style="bold" font-size="24px" color="#626262" align="center">
          Password Reset
        </mj-text>
        <mj-divider border-color="#486EC2" />
      </mj-column>
    </mj-section>
    <mj-wrapper padding-top="0">
      <mj-section>
        <mj-column>
          <mj-text>You are receiving this because you (or someone else) have requested the reset of the password for your account</mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-text>Please click on the following link to complete the process:</mj-text>
          <mj-button href="${process.env.WEBSITE}/forgot-password/${token}" font-family="Helvetica" background-color="#486EC2" color="white">
            Reset Password
          </mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>
  </mj-body>
</mjml>`);
