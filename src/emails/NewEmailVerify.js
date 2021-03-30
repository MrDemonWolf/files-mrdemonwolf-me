const mjml = require('mjml');

/**
 *  @param token
 *  Express is the domain from the request.
 */
module.exports = (email, newEmail, token) =>
  mjml(`<mjml>
  <mj-head>
       <mj-attributes>
      <mj-text font-size="13px"/>
      <mj-all fbackground-color="#ffffff"/>
    </mj-attributes>
  </mj-head>
  <mj-body>
          <mj-section>
            <mj-column>
              <mj-text font-style="bold" font-size="24px" color="#626262" align="center">
                Your account details
              </mj-text>
            <mj-divider border-color="#4f92ff" />
            </mj-column>
          </mj-section>
          <mj-wrapper padding-top="0">
            <mj-section padding-top="0">
              <mj-column>
                <mj-text>
                  You are receiving this because you requested to change your email on${process.env.TITLE}.
                </mj-text>
                <mj-text>Please click verify to finalize your email change.</mj-text>
                <mj-text>Email changing from ${email} to ${newEmail}</mj-text>
              </mj-column>
            </mj-section>
            <mj-section>
              <mj-column>
                <mj-button href="${process.env.FULL_DOMAIN}/account/email-verify/${token}" font-family="Helvetica" background-color="#4f92ff" color="white">
                  Verify
                </mj-button>
              </mj-column>
            </mj-section>
          </mj-wrapper>
        </mj-body>
      </mjml>`);
