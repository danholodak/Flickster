# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  first_name      :string           not null
#  display_name    :string           not null
#  email           :string           not null
#  age             :integer          not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  last_name       :string           not null
#
class User < ApplicationRecord
    has_secure_password

    validates :first_name, :last_name, :email, :age, :password_digest, :session_token, presence: true
    validates :display_name, :email, :session_token, uniqueness: true
    validates :age, numericality:{greater_than_or_equal_to: 13, less_than_or_equal_to: 120, message: "Invalid age"}
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: {in: 12..100, message: "Invalid password"}, allow_nil: true

    before_validation :ensure_session_token

    after_validation :ensure_display_name

    has_many :photos,
    dependent: :destroy

    has_many :favorites,
    primary_key: :id,
    foreign_key: :user_id,
    inverse_of: :user,
    class_name: :Favorite,
    dependent: :destroy

    has_many :favorite_photos,
    through: :favorites,
    source: :photo


    has_many :comments,
    primary_key: :id,
    foreign_key: :author_id,
    dependent: :destroy

    has_many :testimonials,
    primary_key: :id,
    foreign_key: :subject_id,
    class_name: :Testimonial,
    dependent: :destroy

    has_many :written_testimonials,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :Testimonial,
    dependent: :destroy
    

    has_one_attached :prof_pic
    has_one_attached :header

    
    def self.find_by_credentials(email, password)
        @user = User.find_by(email: email)
        if @user
            return @user.authenticate(password)
        else
            return false 
        end
    end


    def ensure_display_name
        self.display_name ||= generate_unique_display_name
    end
    def generate_unique_display_name
        unless self.first_name && self.last_name
            raise "First and last name feilds are required"
        end
        firstlast = self.first_name.downcase + self.last_name.downcase
        displayname = firstlast
        i = 1
        while User.exists?(display_name: displayname)
            displayname = firstlast + i.to_s
            i += 1
        end
        return displayname
    end
    def generate_unique_session_token
        token = SecureRandom::urlsafe_base64
        while User.exists?(session_token: token)
            token = SecureRandom::urlsafe_base64
        end
        return token
    end
    def ensure_session_token
        self.session_token ||= generate_unique_session_token
    end
    def reset_session_token!
        self.session_token = generate_unique_session_token
        self.save
        self.session_token
    end



end
