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
          Account Email Change
        </mj-text>
        <mj-divider border-color="#486EC2" />
      </mj-column>
    </mj-section>
    <mj-wrapper padding-top="0">
      <mj-section padding-top="0">
        <mj-column>
          <mj-text>
            You are receiving this because you wanted to change your email on ${process.env.SITE_TITLE}.
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-text>Please click Comfirm Email to finalize your email change.</mj-text>
|        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-button href="${process.env.WEBSITE}/account/email-change/${token}" font-family="Helvetica" background-color="#486EC2" color="white">
            Comfirm Email
          </mj-button>
        </mj-column>
      </mj-section>
    </mj-wrapper>
  </mj-body>
</mjml>`);
