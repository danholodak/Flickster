json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :display_name, :age, :created_at, :updated_at
  end