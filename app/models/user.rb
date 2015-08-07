class User < ActiveRecord::Base
  has_many :sessions
  validates :username, :password_digest, presence: true
  validates :username, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, length: { minimum: 5 }

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def add_token!
    begin
      session = self.sessions.new
      session.save
    rescue
      retry
    end

    session.session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def remove_token(session_token)
    session = Session.find_by(session_token: session_token)
    session.destroy
  end
end
