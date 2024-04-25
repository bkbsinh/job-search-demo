import FooterLink from "../atom/FooterLink";

const Footer = () => {
  return (
    <section className='h-72 bg-gradient-to-r from-purple-400 to-blue-500 opacity-90'>
      <div className="flex justify-around p-5">
          <div className='flex flex-col justify-center space-y-3'>
            <FooterLink href="/#">
              About
            </FooterLink>

            <FooterLink href="/#">
              Impressum
            </FooterLink>

            <FooterLink href="/#">
              Referrences
            </FooterLink>

            <FooterLink href="/#">
              Contact
            </FooterLink>
          </div>
          
          <div className='flex flex-col justify-center space-y-3'>
            <FooterLink icon="instagram" href="/#">
              Instagram
            </FooterLink>

            <FooterLink icon="facebook" href="/#">
              Facebook
            </FooterLink>

            <FooterLink icon="twitter" href="/#">
              Twitter
            </FooterLink>
          </div>
      </div>
      <div className="m-5 text-center text-gray-700 text-sm font-light">
        @Copyrights sIT 2024. All right served lorem ipsum di monte rian bailamor 
      </div>
    </section>
  )
}

export default Footer
