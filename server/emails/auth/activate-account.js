const mjml = require('mjml');

/**
 *  @param token
 *  Token for the account activate
 */
module.exports = token =>
  mjml(`<mjml>
  <mj-head>
    <mj-attributes>
      <mj-text font-size="13px" />
      <mj-all fbackground-color="#ffffff" />
    </mj-attributes>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text font-style="bold" font-size="24px" color="#626262" align="center">
          Your account details
        </mj-text>
        <mj-divider border-color="#486EC2" />
      </mj-column>
    </mj-section>
    <mj-wrapper padding-top="0">
      <mj-section padding-top="0">
        <mj-column>
          <mj-text>
            You are receiving this because you (or someone else) created a account ${process.env.SITE_TITLE}.
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-text>Please click activate to finalize your account creation.</mj-text>
          <mj-text>If you did not request this account to be made or want your data removed. Please click the delete button.</mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-button href="${process.env.WEBSITE}/activate-account/${token}" font-family="Helvetica" background-color="#486EC2" color="white">
            Activate
          </mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>
  </mj-body>
</mjml>`);
