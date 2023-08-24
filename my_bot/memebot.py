import telegram
from telegram.ext import Updater, MessageHandler, CommandHandler

# Replace "YOUR_BOT_TOKEN" with your actual bot token
BOT_TOKEN = "6214764229:AAGCeY4CSrUlflHm6c0ktR-_R92ntLO9Swg"


# Define a function to handle regular messages
def handle_message(update, context):
    # Get the text message from the update
    text = update.message.text

    # Handle the message based on its content
    if text == "/start":
        update.message.reply_text("Hello! Welcome to your bot!")
    else:
        update.message.reply_text("You said: " + text)


# Define a function to handle the /help command
def handle_help_command(update, context):
    update.message.reply_text("This is the help command.")


def main():
    # Create an Updater and pass your bot's token
    updater = Updater(BOT_TOKEN)

    # Get the dispatcher to register handlers
    dp = updater.dispatcher

    # Add a MessageHandler to handle regular text messages
    message_handler = MessageHandler(Filters.text & ~Filters.command, handle_message)
    dp.add_handler(message_handler)

    # Add a CommandHandler to handle the /help command
    help_handler = CommandHandler("help", handle_help_command)
    dp.add_handler(help_handler)

    # Start the Bot
    updater.start_polling()
    updater.idle()


if __name__ == "__main__":
    main()
