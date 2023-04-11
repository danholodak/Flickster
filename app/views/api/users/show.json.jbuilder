
json.user do
  json.extract! @user, :id, :email, :first_name, :last_name, :display_name, :age, :current_city, :description, :website, :website_name, :occupation, :hometown, :current_city, :country, :airport, :facebook, :twitter, :instagram, :pinterest, :tumblr, :created_at, :updated_at
end
