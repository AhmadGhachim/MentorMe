import { css } from "@emotion/css";


const Landing = () => {
  return (
    <div
      className={css`
        position: relative;
        background-color: var(--background);
        width: 100%;
        height: 3744px;
        overflow: hidden;
        text-align: left;
        font-size: var(--h1-regular-size);
        color: var(--brand-500);
        font-family: var(--body-small);
      `}
    >
      <div
        className={css`
          position: absolute;
          top: 1002px;
          left: 584px;
          font-size: var(--font-size-45xl);
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 264px;
          height: 104px;
        `}
      >
        Features
      </div>
      <div
        className={css`
          position: absolute;
          top: 155px;
          left: 56px;
          width: 1328px;
          height: 686px;
          font-size: var(--body-default-size);
        `}
      >
        <img
          className={css`
            position: absolute;
            top: 0px;
            left: 660px;
            width: 668px;
            height: 686px;
            overflow: hidden;
          `}
          alt=""
          src="/mentoring-illustration.svg"
        />
        <div
          className={css`
            position: absolute;
            top: 127.6px;
            left: 0px;
            width: 601px;
            height: 446.1px;
            overflow: hidden;
          `}
        >
          <div
            className={css`
              position: absolute;
              top: 389.4px;
              left: 0px;
              border-radius: var(--br-9xs);
              background-color: var(--brand-50);
              width: 153px;
              height: 56.7px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            `}
          >
            <div
              className={css`
                position: relative;
                display: inline-block;
                width: 107px;
                height: 24px;
                flex-shrink: 0;
              `}
            >
              Learn More
            </div>
          </div>
          <div
            className={css`
              position: absolute;
              top: 389.4px;
              left: 183px;
              border-radius: var(--br-9xs);
              background-color: var(--brand-500);
              box-shadow: 1px 2px 4px rgba(21, 106, 206, 0.25);
              width: 182px;
              height: 56.7px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: var(--white);
            `}
          >
            <div
              className={css`
                position: relative;
                display: inline-block;
                width: 151px;
                height: 26.2px;
                flex-shrink: 0;
                mix-blend-mode: normal;
              `}
            >
              Create Account
            </div>
          </div>
          <div
            className={css`
              position: absolute;
              top: 0px;
              left: 0px;
              font-size: var(--font-size-45xl);
              display: flex;
              align-items: center;
              width: 601px;
              height: 269.4px;
            `}
          >{`Accessible and tailored mentorship experience `}</div>
          <div
            className={css`
              position: absolute;
              top: 284.7px;
              left: 0px;
              font-size: var(--h4-regular-size);
              color: var(--color-black);
              display: flex;
              align-items: center;
              width: 596px;
              height: 67.6px;
            `}
          >
            Find mentors to develop your skills and connect with like minded
            individuals.
          </div>
        </div>
      </div>
      <div
        className={css`
          position: absolute;
          top: 0px;
          left: calc(50% - 720px);
          box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
          border-bottom: 1px solid var(--brand-50);
          box-sizing: border-box;
          width: 1440px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          padding: 11px 64px 10px;
          gap: 643px;
        `}
      >
        <div
          className={css`
            flex: 1;
            height: 79px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 3px;
          `}
        >
          <img
            className={css`
              position: relative;
              width: 111.3px;
              height: 75px;
              object-fit: cover;
            `}
            alt=""
            src="/graduate-hat@2x.png"
          />
          <div
            className={css`
              position: relative;
              display: flex;
              align-items: center;
              width: 262.7px;
              height: 75px;
              flex-shrink: 0;
            `}
          >
            MentorMe
          </div>
        </div>
        <div
          className={css`
            flex: 1;
            height: 43px;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 24px;
            font-size: var(--body-default-size);
          `}
        >
          <div
            className={css`
              border-radius: var(--br-9xs);
              background-color: var(--brand-50);
              width: 89px;
              height: 43px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            `}
          >
            <div
              className={css`
                position: relative;
              `}
            >
              Login
            </div>
          </div>
          <div
            className={css`
              border-radius: var(--br-9xs);
              background-color: var(--brand-500);
              box-shadow: 1px 2px 4px rgba(21, 106, 206, 0.25);
              width: 177px;
              height: 43px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: var(--white);
            `}
          >
            <div
              className={css`
                position: relative;
                display: inline-block;
                width: 147px;
                mix-blend-mode: normal;
              `}
            >
              Create Account
            </div>
          </div>
        </div>
      </div>
      <div
        className={css`
          position: absolute;
          top: 2703px;
          left: 176px;
          width: 1088px;
          height: 560px;
          font-size: var(--text-14px-regular-size);
          color: var(--font);
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 0px;
            left: 352px;
            font-size: var(--font-size-45xl);
            color: var(--brand-500);
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 385px;
            height: 104px;
          `}
        >
          Top Mentors
        </div>
        <div
          className={css`
            position: absolute;
            top: 208px;
            left: 0px;
            border-radius: var(--br-5xs);
            background-color: var(--generic-white);
            width: 292.5px;
            height: 352px;
            font-size: var(--h4-regular-size);
          `}
        >
          <img
            className={css`
              position: absolute;
              top: 10px;
              left: 10px;
              border-radius: var(--br-5xs);
              width: 272.5px;
              height: 252px;
              object-fit: cover;
            `}
            alt=""
            src="/avatar-image@2x.png"
          />
          <div
            className={css`
              position: absolute;
              top: 269px;
              left: 84px;
              width: 125px;
              height: 22px;
            `}
          >
            <div
              className={css`
                position: absolute;
                top: 0px;
                left: -9px;
              `}
            >
              Huzaifa Anas
            </div>
            <div
              className={css`
                position: absolute;
                top: 26px;
                left: 0px;
                display: none;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                gap: var(--gap-9xs);
                font-size: var(--text-14px-regular-size);
                color: var(--gray-500);
                font-family: var(--text-14px-regular);
              `}
            >
              <img
                className={css`
                  position: relative;
                  width: 18px;
                  height: 18px;
                `}
                alt=""
                src="/link.svg"
              />
              <div
                className={css`
                  position: relative;
                  letter-spacing: -0.01em;
                  line-height: 20px;
                `}
              >
                Link
              </div>
            </div>
          </div>
          <div
            className={css`
              position: absolute;
              top: 305px;
              left: 39px;
              font-size: var(--body-small-size);
              display: inline-block;
              width: 215px;
              height: 18px;
            `}
          >
            Software Engineer @Google
          </div>
        </div>
        <div
          className={css`
            position: absolute;
            top: 208px;
            left: 418px;
            border-radius: var(--br-5xs);
            background-color: var(--generic-white);
            width: 272px;
            height: 352px;
          `}
        >
          <img
            className={css`
              position: absolute;
              top: 10px;
              left: 10px;
              border-radius: var(--br-5xs);
              width: 252px;
              height: 252px;
              object-fit: cover;
            `}
            alt=""
            src="/avatar-image1@2x.png"
          />
          <div
            className={css`
              position: absolute;
              top: 271px;
              left: 48px;
              width: 83px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              color: var(--gray-500);
              font-family: var(--text-14px-regular);
            `}
          >
            <div
              className={css`
                display: none;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                gap: var(--gap-9xs);
              `}
            >
              <img
                className={css`
                  position: relative;
                  width: 18px;
                  height: 18px;
                `}
                alt=""
                src="/link.svg"
              />
              <div
                className={css`
                  position: relative;
                  letter-spacing: -0.01em;
                  line-height: 20px;
                `}
              >
                Link
              </div>
            </div>
          </div>
          <div
            className={css`
              position: absolute;
              top: 269px;
              left: 78px;
              font-size: var(--h4-regular-size);
            `}
          >
            Jolene Orr
          </div>
          <div
            className={css`
              position: absolute;
              top: 305px;
              left: 27px;
              font-size: var(--body-small-size);
              display: inline-block;
              width: 219px;
              height: 30px;
            `}
          >
            Project manager @Facebook
          </div>
        </div>
        <div
          className={css`
            position: absolute;
            top: 208px;
            left: 816px;
            border-radius: var(--br-5xs);
            background-color: var(--generic-white);
            width: 272px;
            height: 352px;
          `}
        >
          <img
            className={css`
              position: absolute;
              top: 10px;
              left: 10px;
              border-radius: var(--br-5xs);
              width: 252px;
              height: 252px;
              object-fit: cover;
            `}
            alt=""
            src="/avatar-image2@2x.png"
          />
          <div
            className={css`
              position: absolute;
              top: 270px;
              left: 10px;
              width: 65px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
              color: var(--gray-500);
              font-family: var(--text-14px-regular);
            `}
          >
            <div
              className={css`
                display: none;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;
                gap: var(--gap-9xs);
              `}
            >
              <img
                className={css`
                  position: relative;
                  width: 18px;
                  height: 18px;
                `}
                alt=""
                src="/link.svg"
              />
              <div
                className={css`
                  position: relative;
                  letter-spacing: -0.01em;
                  line-height: 20px;
                `}
              >
                Link
              </div>
            </div>
          </div>
          <div
            className={css`
              position: absolute;
              top: 269px;
              left: 106px;
              font-size: var(--h4-regular-size);
            `}
          >
            Henry
          </div>
          <div
            className={css`
              position: absolute;
              top: 305px;
              left: 44px;
              font-size: var(--body-small-size);
              display: inline-block;
              width: 190px;
              height: 28px;
            `}
          >
            Acquisitions @BlackRock
          </div>
        </div>
        <div
          className={css`
            position: absolute;
            top: 104px;
            left: 158px;
            font-size: var(--body-small-size);
            text-align: center;
            display: inline-block;
            width: 773px;
          `}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec maximus
          neque interdum mollis venenatis. Nulla vel ornare turpis. Fusce magna
          turpis, eleifend eu leo sed, varius vehicula odio.
        </div>
      </div>
      <div
        className={css`
          position: absolute;
          top: 1179px;
          left: 90px;
          width: 1253px;
          height: 859px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          color: var(--font);
        `}
      >
        <div
          className={css`
            position: relative;
            width: 1253px;
            height: 381px;
          `}
        >
          <div
            className={css`
              position: absolute;
              top: 40px;
              left: 625px;
              width: 628px;
              height: 238px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
            `}
          >
            <div
              className={css`
                position: relative;
                display: flex;
                align-items: center;
                width: 628px;
                height: 208px;
                flex-shrink: 0;
              `}
            >
              Meet and connect with industry professionals
            </div>
            <div
              className={css`
                position: relative;
                font-size: var(--h4-regular-size);
                color: var(--color-black);
                display: flex;
                align-items: center;
                width: 545.5px;
                margin-top: -32px;
              `}
            >
              Have a one-on-one meetings with leading professionals from wide
              range of industries.
            </div>
          </div>
          <img
            className={css`
              position: absolute;
              top: 0px;
              left: 0px;
              width: 432px;
              height: 381px;
              overflow: hidden;
            `}
            alt=""
            src="/connect.svg"
          />
        </div>
        <div
          className={css`
            position: relative;
            width: 1223px;
            height: 518px;
            margin-top: -40px;
          `}
        >
          <div
            className={css`
              position: absolute;
              top: 178px;
              left: 0px;
              width: 601px;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              justify-content: flex-start;
            `}
          >
            <div
              className={css`
                position: relative;
                display: flex;
                align-items: center;
                width: 601px;
                height: 208px;
                flex-shrink: 0;
              `}
            >
              Join discussion groups
            </div>
            <div
              className={css`
                position: relative;
                font-size: var(--h4-regular-size);
                color: var(--color-black);
                display: flex;
                align-items: center;
                width: 522px;
                margin-top: -72px;
              `}
            >
              Share and participate within your community to learn about the
              latest trends in your industry.
            </div>
          </div>
          <img
            className={css`
              position: absolute;
              top: 0px;
              left: 639px;
              width: 584px;
              height: 518px;
              overflow: hidden;
            `}
            alt=""
            src="/groups.svg"
          />
        </div>
      </div>
      <div
        className={css`
          position: absolute;
          top: 2092px;
          left: 115px;
          width: 1233px;
          height: 528.1px;
          overflow: hidden;
          color: var(--font);
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 45px;
            left: 605px;
            display: flex;
            align-items: center;
            width: 628px;
            height: 437px;
          `}
        >
          Attend mentor session and participate in discussions to gain
          achievements
        </div>
        <div
          className={css`
            position: absolute;
            top: 360.3px;
            left: 605.4px;
            font-size: var(--h4-regular-size);
            color: var(--color-black);
            display: flex;
            align-items: center;
            width: 613.9px;
            height: 107.7px;
          `}
        >
          Participating in discussions and attending sessions will gain you
          certificates and badges on your profile.
        </div>
        <img
          className={css`
            position: absolute;
            height: 100%;
            width: 41.12%;
            top: 0%;
            right: 58.88%;
            bottom: 0%;
            left: 0%;
            max-width: 100%;
            overflow: hidden;
            max-height: 100%;
          `}
          alt=""
          src="/success-social-media---achievement-woman-trophy-award-reward-win-competition.svg"
        />
      </div>
      <div
        className={css`
          position: absolute;
          top: 3382px;
          left: 0px;
          background-color: var(--brand-500);
          width: 1440px;
          height: 362px;
          overflow: hidden;
          font-size: var(--body-small-size);
          color: var(--background);
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 255px;
            left: 502px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
          `}
        >
          <div
            className={css`
              display: flex;
              flex-direction: row;
              align-items: flex-start;
              justify-content: flex-start;
              gap: 32px;
            `}
          >
            <div
              className={css`
                position: relative;
              `}
            >
              Privacy Policy
            </div>
            <div
              className={css`
                position: relative;
              `}
            >
              Terms and conditions
            </div>
            <div
              className={css`
                position: relative;
              `}
            >
              sitemap
            </div>
            <div
              className={css`
                position: relative;
              `}
            >
              Legal
            </div>
          </div>
        </div>
        <div
          className={css`
            position: absolute;
            top: 66px;
            left: 378px;
            width: 684.3px;
            height: 189px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            gap: 13px;
            font-size: 96px;
          `}
        >
          <img
            className={css`
              position: relative;
              width: 186.3px;
              height: 120px;
              object-fit: cover;
            `}
            alt=""
            src="/graduate-hat1@2x.png"
          />
          <b
            className={css`
              position: relative;
              display: flex;
              align-items: center;
              width: 485px;
              height: 189px;
              flex-shrink: 0;
            `}
          >
            MentorMe
          </b>
        </div>
      </div>
    </div>
  );
};

export default Landing;
